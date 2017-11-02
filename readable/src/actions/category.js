import { ON_CATEGORY_CHANGED } from './types'

export function categoryChanged({ category }) { 
    return {
        type: ON_CATEGORY_CHANGED,
        category        
    }
}