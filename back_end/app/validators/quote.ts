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
            fullName: vine.string().minLength(3).maxLength(100).optional(),
            phoneContact: vine.string().minLength(10).maxLength(20).optional(),
            title: vine.string().minLength(3).maxLength(100).optional(),
            text: vine.string().minLength(3).maxLength(100).optional(),
            address: vine.string().minLength(10).maxLength(1000).optional(),
            materialsList: vine.array(vine.string().minLength(3).maxLength(100)).optional()
        }
    )
)

export const updateQuoteMaterialValidator = vine.compile(
    vine.object(
        {
            materialsList: vine.array(vine.string().minLength(3).maxLength(100)).optional()
        }
    )
)
