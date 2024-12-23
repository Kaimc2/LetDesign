export interface Design {
    id: string,
    name: string,
    userId: string,
    designThumbnail?: string;
    frontContent: string,
    backContent: string,
    status: string,
    updatedAt: string,
}

export interface DesignInput {
    name: string,
    user_id: string,
    design_thumbnail: string,
    front_content: string,
    back_content: string,
    status: string,
}