import {auth} from '@/lib/auth'
import {BASE_URL} from '@/lib/env'
import {stripe} from '@/lib/stripe'
import {SubmitButton} from '@repo/design-system/components/forms'
import {Check, Zap} from '@repo/design-system/components/icons'
import {cn} from '@repo/design-system/lib/utils'
import {redirect} from 'next/navigation'
import Stripe from 'stripe'

type PricedProduct = Omit<Stripe.Product, 'default_price'> & {
  default_price: Stripe.Price
}
/**
 * Retrieves all products from Stripe.
 * @returns
 */

async function getAllProducts() {
  if (!stripe) {
    throw new Error('Stripe is not initialized.')
  }

  const products = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const list = (products?.data as PricedProduct[]) || []
  return list.sort((a, b) => {
    if (a.default_price.unit_amount && b.default_price.unit_amount) {
      return a.default_price.unit_amount > b.default_price.unit_amount ? 1 : -1
    } else if (a.default_price.unit_amount) {
      return 1
    } else if (b.default_price.unit_amount) {
      return -1
    } else {
      return 0
    }
  })
}
/**
 * Retrieves a coupon from Stripe.
 * @param couponId
 * @returns
 */

async function getCoupon(couponId?: string) {
  if (!stripe) {
    throw new Error('Stripe is not initialized.')
  }

  if (!couponId) {
    return
  }

  const coupon = await stripe.coupons.retrieve(couponId)
  return coupon
}
/**
 * Redirects to Stripe Checkout.
 */

async function redirectToCheckout({
  product,
  couponId,
}: {
  product: PricedProduct
  couponId?: string
}) {
  const userSession = await auth()
  const coupon = await getCoupon(couponId)

  const checkoutSession = await stripe?.checkout.sessions.create({
    client_reference_id: userSession?.user?.id,
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: product.default_price.id,
        quantity: 1,
      },
    ],
    discounts: coupon?.valid ? [{coupon: coupon.id}] : [],
    customer: userSession?.user?.stripeCustomerId,
    mode: 'payment',
    success_url: `${BASE_URL}/payment/success`,
    cancel_url: `${BASE_URL}`,
  })

  if (!checkoutSession) {
    throw new Error('Failed to create checkout session.')
  }

  await redirect(checkoutSession.url!)
}
type PrincingProps = {
  /** Stripe's coupon ID that will be used to apply discounts automatically */
  couponId?: string
}
/**
 * Pricing Section: Two tiers with emphasized tier
 */
export async function Pricing({couponId}: PrincingProps) {
  const products = await getAllProducts()
  const coupon = await getCoupon(couponId)

  return (
    <div className="relative isolate bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#f8265d] to-[#0196ff] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 className="text-base font-semibold leading-7 text-primary">
          Pricing
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
          The right price for you, whoever you are
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground text-balance">
        Qui iusto aut est earum eos quae. Eligendi est at nam aliquid ad quo
        reprehenderit in aliquid fugiat dolorum voluptatibus.
      </p>
      <div className="mx-auto mt-16 grid gap-8 max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-2">
        {products.map(product => {
          const currency = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: product.default_price.currency.toUpperCase(),
            minimumFractionDigits: 0,
          })

          const format = (amount: number) => currency.format(amount / 100)

          return (
            <div
              key={product.id}
              className={
                product.metadata.featured
                  ? 'bg-gradient-to-tr to-[#f8265d] from-[#0196ff] p-0.5 rounded-[1.625rem]'
                  : ''
              }
            >
              <div
                className={cn(
                  product.metadata.featured
                    ? 'relative shadow-2xl'
                    : 'border-border',
                  'bg-card rounded-3xl p-8 ring-1 border ring-accent/10 sm:p-10',
                )}
              >
                {product.metadata.featured && (
                  <div className="text-white absolute -top-3.5 rounded-full bg-gradient-to-tr from-[#8564a7] to-[#f8265d] text-sm py-0.5 px-2 -ml-2 font-semibold">
                    Recommended
                  </div>
                )}

                <h3
                  id={product.id}
                  className="text-accent-foreground text-base font-semibold leading-7 mb-4"
                >
                  {product.name}
                </h3>

                {product.default_price.unit_amount && coupon?.valid ? (
                  <span className="decoration-muted-foreground text-muted-foreground line-through decoration-1 decoration-wavy text-2xl">
                    {format(product.default_price.unit_amount)}
                  </span>
                ) : null}
                <p className="flex items-baseline gap-x-2">
                  <span className="text-primary text-5xl font-bold tracking-tight">
                    {product.default_price.unit_amount
                      ? format(
                          product.default_price.unit_amount -
                            (coupon?.valid
                              ? coupon?.amount_off ||
                                (product.default_price.unit_amount *
                                  (coupon?.percent_off || 0)) /
                                  100
                              : 0),
                        )
                      : null}
                  </span>
                  <span className="text-muted-foreground text-base">
                    {product.default_price.type === 'recurring' ? (
                      <>/{product.default_price.recurring!.interval}</>
                    ) : (
                      'one-time'
                    )}
                  </span>
                </p>
                <p className="text-muted-foreground mt-6 text-base leading-7">
                  {product.description}
                </p>
                <ul
                  role="list"
                  className="text-foreground mt-8 space-y-3 text-sm leading-6 sm:mt-4"
                >
                  {product.features
                    .filter(f => f.name)
                    .map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex gap-x-3">
                        <Check
                          className="text-[#0096ff] h-6 w-5 flex-none"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </li>
                    ))}
                </ul>

                <form
                  action={async () => {
                    'use server'
                    await redirectToCheckout({product, couponId})
                  }}
                  className="w-full"
                >
                  <SubmitButton
                    aria-describedby={product.id}
                    icon={<Zap className="w-4 h-4 mr-2" />}
                    className={cn(
                      product.metadata.featured ? '' : 'ring-1 ring-accent/10',
                      'mt-8 sm:mt-10 w-full',
                    )}
                  >
                    {product.metadata.cta || 'Buy Now'}
                  </SubmitButton>
                </form>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
