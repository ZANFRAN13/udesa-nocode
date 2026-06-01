# Especificación: Motor de Descuentos

## 1. Alcance

Este documento define las reglas de negocio para el motor de descuentos de la plataforma de e-commerce. Todo código que implemente descuentos DEBE respetar estas reglas.

---

## 2. Tipos de descuento

### 2.1 Promociones por categoría
- Aplican un **porcentaje de descuento** a todos los productos de una categoría específica.
- Se configuran con: `categoría`, `porcentaje`, `nombre de la promo`.
- Aplican automáticamente (no requieren código del usuario).
- Un producto solo puede recibir **una** promoción de categoría.

### 2.2 Cupones con umbral
- Aplican un **monto fijo de descuento** al total del carrito.
- Se configuran con: `código`, `monto de descuento`, `umbral mínimo`.
- Requieren que el usuario ingrese el código del cupón.
- Un carrito solo puede tener **un** cupón activo.

---

## 3. Orden de aplicación

Los descuentos se aplican en el siguiente orden estricto:

```
1. Promociones por categoría (sobre el precio unitario de cada item)
2. Recalcular subtotal del carrito
3. Evaluar elegibilidad de cupones (sobre el subtotal recalculado)
4. Si el cupón es elegible, aplicar el descuento fijo
5. Calcular total final
```

> **REGLA CRÍTICA:** La elegibilidad de un cupón se evalúa DESPUÉS de aplicar las promociones por categoría, sobre el subtotal resultante — nunca sobre el total original del carrito.

---

## 4. Reglas de elegibilidad de cupones

Un cupón con umbral mínimo `X` aplica si y solo si:

```
subtotal_post_promos > X
```

- La comparación es **estrictamente mayor** (>), no mayor o igual (>=).
- El `subtotal_post_promos` es la suma de precios unitarios después de aplicar todas las promociones de categoría.

---

## 5. Restricciones

- El precio final de un item no puede ser menor a **$0**.
- El total del carrito no puede ser menor a **$0**.
- Los porcentajes de descuento deben estar entre **0% y 100%** (exclusivo).
- Los montos de cupón deben ser **positivos**.

---

## 6. Ejemplos de referencia

### Ejemplo A — Cupón aplica
| Producto | Categoría | Precio | Promo | Precio final |
|----------|-----------|--------|-------|-------------|
| Laptop   | Electrónica | $1,000 | 20% off | $800 |
| Mochila  | Accesorios | $120 | — | $120 |
| **Subtotal post-promos** | | | | **$920** |

Cupón SAVE50 (umbral $200): $920 > $200 → **Aplica**. Total: **$870**.

### Ejemplo B — Cupón NO aplica
| Producto | Categoría | Precio | Promo | Precio final |
|----------|-----------|--------|-------|-------------|
| Auriculares | Electrónica | $150 | 20% off | $120 |
| Funda | Accesorios | $80 | — | $80 |
| **Subtotal post-promos** | | | | **$200** |

Cupón SAVE50 (umbral $200): $200 **NO es >** $200 → **No aplica**. Total: **$200**.

### Ejemplo C — Sin promo de categoría
| Producto | Categoría | Precio | Promo | Precio final |
|----------|-----------|--------|-------|-------------|
| Mochila | Accesorios | $150 | — | $150 |
| Funda | Accesorios | $80 | — | $80 |
| **Subtotal post-promos** | | | | **$230** |

Cupón SAVE50 (umbral $200): $230 > $200 → **Aplica**. Total: **$180**.
