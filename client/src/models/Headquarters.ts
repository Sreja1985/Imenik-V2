export type Headquarters = { id: string, headquarters_name : string, short_name: string, headquarters_color: string, is_deleted: boolean }

export const EmptyHeadquarters: Partial<Headquarters> = { id: "", headquarters_name : "", short_name: "", headquarters_color: "", is_deleted: false }