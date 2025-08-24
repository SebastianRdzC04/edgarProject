import type { HttpContext } from '@adonisjs/core/http'
import Material from '#models/material'
import { materialValidator } from '#validators/material'

export default class MaterialsController {
    async getAll ({ response }: HttpContext) {
        const materials = await Material.query()
        return response.ok({
            message: 'Materials retrieved successfully',
            data: {
                materials: materials
            }
        })
    }

    async getById ({ params, response }: HttpContext) {
        const material = await Material.query().where('id', params.id).firstOrFail()
        return response.ok({
            message: 'Material retrieved successfully',
            data: {
                material: material
            }
        })
    }

    async create({ request, response }: HttpContext) {
        const payload = await materialValidator.validate(request.all())
        const material = await Material.create({
            name: payload.name,
            description: payload.description
        })

        return response.created({
            message: 'Material created successfully',
            data: {
                material: material
            }
        })
    }

    async update({ params, request, response }: HttpContext) {
        const material = await Material.query().where('id', params.id).firstOrFail()
        const payload = await materialValidator.validate(request.all())
        material.name = payload.name
        material.description = payload.description
        await material.save()

        return response.ok({
            message: 'Material updated successfully',
            data: {
                material: material
            }
        })
    }

}