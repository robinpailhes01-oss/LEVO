/* ──────────────────────────────────────────────────────────────────
   La piste du parcours : six lieux, une seule timeline (p ∈ [0, 1]).

   Chaque lieu a une « station » (la caméra tient, le texte est là) et
   un « trajet » vers le suivant. Les longueurs sont en hauteurs
   d'écran ; leur somme fait la longueur de la page (≈ 11,4 vh, hors
   de la bande 13,6-13,8 du registre). Le cœur, pic du parcours,
   reçoit la plus grande station.

   Tout ce qui bouge (caméra, objets, texte, carte) lit cette piste.
   ────────────────────────────────────────────────────────────────── */

export interface Waypoint {
  id: string;
  label: string;
  /** Position du lieu dans le monde. */
  pos: [number, number, number];
  /** Décalage de la caméra par rapport au lieu, en station. */
  cam: [number, number, number];
  /** Station (tenue) et trajet vers le lieu suivant, en hauteurs d'écran. */
  hold: number;
  travel: number;
  /** Décalage de la visée (x, y) sur desktop : x > 0 pousse l'objet à droite, y > 0 le remonte. */
  side: [number, number];
  /** Même chose en portrait : on remonte les objets au-dessus du texte (y > 0). */
  sideMobile: [number, number];
  /** Recul supplémentaire en portrait pour les objets larges (défaut 1). */
  zoomMobile?: number;
}

export const WAYPOINTS: Waypoint[] = [
  { id: "comptoir", label: "Le comptoir", pos: [0, 0, 0], cam: [0.6, 0.9, 8.2], hold: 1.2, travel: 0.6, side: [1.8, 0.1], sideMobile: [0, 1.6] },
  { id: "coulee", label: "La coulée", pos: [7, -9, -3], cam: [0, 2.2, 9.5], hold: 1.4, travel: 0.6, side: [0, 0], sideMobile: [0, 1.2] },
  { id: "coeur", label: "Le cœur", pos: [18, -14, -8], cam: [1.4, 0.4, 9], hold: 2.4, travel: 0.6, side: [-1.6, 0.2], sideMobile: [0, 1.6] },
  { id: "atelier", label: "L'atelier", pos: [33, -14, -5], cam: [1.4, 1.4, 10], hold: 1.5, travel: 0.5, side: [0, 1.1], sideMobile: [0, 1.7] },
  { id: "tableau", label: "Le tableau", pos: [47, -12, -7], cam: [0, 0.2, 10.5], hold: 1.2, travel: 0.5, side: [2.2, 0.1], sideMobile: [0, 1.5], zoomMobile: 1.4 },
  { id: "arrivee", label: "L'arrivée", pos: [56, -8, -3], cam: [0.4, 3.2, 7.4], hold: 1.0, travel: 0, side: [0, -1.3], sideMobile: [0, -1.1] },
];

export const TOTAL_VH = WAYPOINTS.reduce((s, w) => s + w.hold + w.travel, 0);

/** Bornes de chaque station et trajet en fraction de p. */
export interface Station {
  index: number;
  start: number; // début de la tenue
  end: number; // fin de la tenue (début du trajet)
  next: number; // arrivée au lieu suivant (= start du suivant)
}

export const STATIONS: Station[] = (() => {
  const out: Station[] = [];
  let acc = 0;
  WAYPOINTS.forEach((w, i) => {
    const start = acc / TOTAL_VH;
    const end = (acc + w.hold) / TOTAL_VH;
    const next = (acc + w.hold + w.travel) / TOTAL_VH;
    out.push({ index: i, start, end, next });
    acc += w.hold + w.travel;
  });
  return out;
})();

export const smooth = (t: number): number => t * t * (3 - 2 * t);
export const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

/**
 * Paramètre de caméra continu u ∈ [0, N-1] : entier en station, fraction
 * lissée en trajet (vitesse nulle aux deux bouts, donc pas d'à-coup).
 */
export function cameraParam(p: number): number {
  for (const s of STATIONS) {
    if (p <= s.end) return s.index;
    if (p < s.next) {
      const t = (p - s.end) / (s.next - s.end);
      return s.index + smooth(t);
    }
  }
  return WAYPOINTS.length - 1;
}

/** Progression locale d'un lieu : 0 avant, 0→1 pendant la tenue, 1 après. */
export function local(index: number, p: number): number {
  const s = STATIONS[index];
  return clamp01((p - s.start) / (s.end - s.start));
}

/** Proximité d'un lieu : 1 en station, décroît sur les trajets voisins. */
export function presence(index: number, p: number): number {
  const s = STATIONS[index];
  const prev = STATIONS[index - 1];
  if (p >= s.start && p <= s.end) return 1;
  if (prev && p > prev.end && p < s.start) return smooth((p - prev.end) / (s.start - prev.end));
  if (p > s.end && p < s.next) return 1 - smooth((p - s.end) / (s.next - s.end));
  return 0;
}

/** Le lieu courant (pour la carte). */
export function currentIndex(p: number): number {
  let idx = 0;
  for (const s of STATIONS) {
    const mid = (s.end + s.next) / 2;
    if (p >= (s.index === 0 ? -1 : STATIONS[s.index - 1].end + (s.start - STATIONS[s.index - 1].end) / 2)) idx = s.index;
    if (p < mid) break;
  }
  return idx;
}
