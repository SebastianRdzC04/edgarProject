import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import QuoteMaterial from './quote_material.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

/**
 * CREATE TABLE materials(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);
 */

export default class Material extends BaseModel {
  public static table = 'materials'
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => QuoteMaterial, {
    foreignKey: 'materialId',
  })
  declare quoteMaterials: HasMany<typeof QuoteMaterial>

}