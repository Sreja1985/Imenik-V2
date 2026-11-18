export type Location = { id: string, locality_name: string, locality_color: string, is_deleted: boolean }

export const EmptyLocation: Partial<Location> = { id: "", locality_name: "", locality_color: "", is_deleted: false };