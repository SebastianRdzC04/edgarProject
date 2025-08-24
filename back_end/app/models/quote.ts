import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import QuoteMaterial from './quote_material.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Quote extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare fullName: string

  @column()
  declare phoneContact: string

  @column()
  declare title: string

  @column()
  declare text: string

  @column()
  declare address : string

  @column()
  declare status : string

  @column()
  declare price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


  @hasMany(() => QuoteMaterial, {
    foreignKey: 'quoteId',
  })
  declare quoteMaterials: HasMany<typeof QuoteMaterial>

}