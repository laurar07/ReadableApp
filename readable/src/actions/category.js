export const ON_CATEGORY_CHANGED = 'ON_CATEGORY_CHANGED'

export function categoryChanged({ category }) { 
    return {
        type: ON_CATEGORY_CHANGED,
        category        
    }
}