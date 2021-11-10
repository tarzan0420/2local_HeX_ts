import { createAction } from '@reduxjs/toolkit'
import { TokenList } from '@uniswap/token-lists'

export type PopupContent =
  | {
      txn: {
        hash: string
        success: boolean
        summary?: string
      }
    }
  | {
      listUpdate: {
        listUrl: string
        oldList: TokenList
        newList: TokenList
        auto: boolean
      }
    }

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('app/updateBlockNumber')
export const toggleWalletModal = createAction<void>('app/toggleWalletModal')
export const toggleSettingsMenu = createAction<void>('app/toggleSettingsMenu')
export const addPopup = createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>('app/addPopup')
export const removePopup = createAction<{ key: string }>('app/removePopup')
export const toggleExchangeTab = createAction<{ tabName: string }>('app/tab')
export const toggleExchangeCoin = createAction<{ coinName: string }>('app/coin')
export const toggleExchangeToken = createAction<{ tokenName: string }>('app/token')
export const toggleSimplexCheckoutModal = createAction<void>('app/toggleSimplexCheckoutModal')
export const toggleAdvCashCheckoutModal = createAction<void>('app/toggleAdvCashCheckoutModal')

