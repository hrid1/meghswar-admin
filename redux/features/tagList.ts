export const  TAG_TYPES = {
    Merchants: "Merchants" ,
    Riders: "Riders" ,
    Posts: "Posts" ,
    Categories: "Categories" ,
    
} as const;

export type TagType = typeof TAG_TYPES[keyof typeof TAG_TYPES];

export const tagTypes = Object.values(TAG_TYPES);