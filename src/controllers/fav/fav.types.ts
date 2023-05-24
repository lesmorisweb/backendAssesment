export interface BulkCreateFavRequirements {
   favs: Fav[],
   favListReq: tFavListRequirement
}

export type tFavListRequirement = ExistingFavList | NewFavList

export interface ExistingFavList {
   favListId: number
}

export interface NewFavList {
   favListName: string,
   userId: number,
   favListId: undefined
}

interface Fav {
   title: string,
   description: string,
   link: string,
}

export interface BulkCreateFavRequest {
   favs: Fav[],
   favListName?: string,
   favListId?: number
   userId?: number,
}
