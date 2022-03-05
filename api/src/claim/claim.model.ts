export enum Status {
    opened,
    accepted,
    inWork,
    attention,
    closed
}

export class ClaimModel {
    text: string
    images: string[]
    canReadIds: string[]
    canRead: string[]
    canCommentIds: string[]
    canComment: string[]
    ownerId: string
    owner: string
    commentIds: string[]
    status: Status
    systemId: string
    system: string
    placeId: string
    place: string
}
