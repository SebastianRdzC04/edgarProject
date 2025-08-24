import vine from '@vinejs/vine'
export const quoteValidator = vine.compile(
    vine.object(
        {
            fullName: vine.string().minLength(3).maxLength(100),
            phoneContact: vine.string().minLength(10).maxLength(20),
            title: vine.string().minLength(3).maxLength(100),
            text: vine.string().minLength(3).maxLength(100),
            address: vine.string().minLength(10).maxLength(1000),
            materialsList: vine.array(vine.string().minLength(3).maxLength(100)).optional()
        }
    )
)


export const updateQuoteValidator = vine.compile(
    vine.object(
        {
            price: vine.number().min(0),
        }
    )
)

export const updateQuoteMaterialValidator = vine.compile(
    vine.object(
        {
            quantity: vine.number().min(1).optional(),
            price: vine.number().min(0).optional()
        }
    )
)
