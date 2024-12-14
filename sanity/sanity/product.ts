export const product = {
    name: 'product', // name of the document type
    title: 'Product', // title of the document type
    type: 'document', //    type of the document
    fields: [
        {
            name: 'title', // name of the field
            title: 'Title', // title of the field
            type: 'string', // type of the field
        },
        {
            name: 'description',
            title: 'Product Description',
            type: 'string',
            
        },
        {
            name: 'price',
            title: 'Product Price',
            type: 'number',
        },
        {   
            name: 'image',
            title: 'Product Image',
            type: 'array',
            of: [{ 
                name: 'img',
                title: 'Image',
                type: 'image',
                
             }],
        },
        {
            name: 'category',
            title: 'Product Category',
            type: 'reference',
            to: [
                {
                type: 'category'
                }
            ]
        
        
        
        }
    ]
}