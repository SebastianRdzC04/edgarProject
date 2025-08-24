import type { HttpContext } from '@adonisjs/core/http'
import Quote from '#models/quote'
import Material from '#models/material'
import QuoteMaterial from '#models/quote_material'
import { quoteValidator } from '#validators/quote'

export default class QuotesController {
    
    async getAll ({response}: HttpContext) {
        const quotes = await Quote.query().preload('quoteMaterials', (qmQuery) => {
            qmQuery.preload('material')
        })

        const quotesWithMaterials = await Promise.all(quotes.map(async (quote) => {
            const materialsId = quote.quoteMaterials.map(qm => qm.materialId)
            const materialsData = await Material.query().whereIn('id', materialsId)

            return {
                ...quote.serialize(),
                materials: materialsData
            }
        }))

        return response.ok({
            message: 'Quotes retrieved successfully',
            data: {
                quotes: quotesWithMaterials
            }
        })
    }
    async getById ({ params, response }: HttpContext) {
        const quote = await Quote.query().where('id', params.id).preload('quoteMaterials', (qmQuery) => {
            qmQuery.preload('material')
        }).firstOrFail()

        const materialsId = quote.quoteMaterials.map(qm => qm.materialId)

        const materialsData = await Material.query().whereIn('id', materialsId)

        const quoteWithMaterialsData = {
            ...quote.serialize(),
            materials: materialsData
        }



        return response.ok({
            message: 'Quote retrieved successfully',
            data: {
                quote: quoteWithMaterialsData
            }
        })
    }
    async create ({ request, response }: HttpContext) {
        const payload = await quoteValidator.validate(request.all())
        const materialsIds = payload.materialsList ? payload.materialsList : []

        console.log(materialsIds)

        // verify if the materials list exist in database
        const materials = await Material.query().whereIn('id', materialsIds)
        if (materials.length === 0 && materialsIds.length > 0) {
            return response.badRequest({
                message: 'Invalid materials list'
            })
        }

        const quote = await Quote.create({
            fullName: payload.fullName,
            phoneContact: payload.phoneContact,
            title: payload.title,
            text: payload.text,
            address: payload.address,
        })

        await Promise.all(materials.map(material => {
            return QuoteMaterial.create({
                quoteId: quote.id,
                materialId: material.id,
            })
        }))


        if (materials.length > 0){
            const quoteWithMaterialsData = {
                ...quote.serialize(),
                materials: materials
            }

            return response.created({
                message: 'Quote created successfully',
                data: {
                    quote: quoteWithMaterialsData
                }
            })

        }

        return response.created({
            message: 'Quote created successfully',
            data: {
                quote: quote
            }
        })
    }

    async update ({ params, request, response }: HttpContext) {
        const payload = await quoteValidator.validate(request.all())
        const materialsIds = payload.materialsList ? payload.materialsList : []

        // verify if the materials list exist in database
        const materials = await Material.query().whereIn('id', materialsIds)
        if (materials.length === 0 && materialsIds.length > 0) {
            return response.badRequest({
                message: 'Invalid materials list'
            })
        }

        const quote = await Quote.findOrFail(params.id)
        quote.merge({
            fullName: payload.fullName,
            phoneContact: payload.phoneContact,
            title: payload.title,
            text: payload.text,
            address: payload.address,
        })

        await quote.save()

        // Update materials
        await QuoteMaterial.query().where('quoteId', quote.id).delete()
        await Promise.all(materials.map(material => {
            return QuoteMaterial.create({
                quoteId: quote.id,
                materialId: material.id,
            })
        }))

        return response.ok({
            message: 'Quote updated successfully',
            data: {
                quote: quote
            }
        })
    }

    async updateQuoteMaterial ({ params, request, response }: HttpContext) {
        const payload = await quoteValidator.validate(request.all())
        const materialsIds = payload.materialsList ? payload.materialsList : []

        // verify if the materials list exist in database
        const materials = await Material.query().whereIn('id', materialsIds)
        if (materials.length === 0 && materialsIds.length > 0) {
            return response.badRequest({
                message: 'Invalid materials list'
            })
        }

        const quote = await Quote.findOrFail(params.id)

        // Update materials
        await QuoteMaterial.query().where('quoteId', quote.id).delete()
        await Promise.all(materials.map(material => {
            return QuoteMaterial.create({
                quoteId: quote.id,
                materialId: material.id,
            })
        }))

        return response.ok({
            message: 'Quote materials updated successfully',
            data: {
                quote: quote
            }
        })
    }

}