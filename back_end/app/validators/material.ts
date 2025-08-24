import vine from '@vinejs/vine'

export const materialValidator = vine.compile(
    vine.object(
        {
            name: vine.string(),
            description: vine.string(),
        }
    )
)