import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Quote from './quote.js'
import Material from './material.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

/**
 * 
CREATE TABLE quotes_materials(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id uuid REFERENCES quotes(id) ON DELETE CASCADE,
    material_id uuid REFERENCES materials(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price INT NOT NULL DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE
);

 */

export default class QuoteMaterial extends BaseModel {
  public static table = 'quotes_materials'
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare quoteId: string

  @column()
  declare materialId: string

  @column()
  declare quantity: number

  @column()
  declare price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Quote, {
    foreignKey: 'quoteId',
  })
  declare quote: BelongsTo<typeof Quote>

  @belongsTo(() => Material, {
    foreignKey: 'materialId',
  })
  declare material: BelongsTo<typeof Material>
}