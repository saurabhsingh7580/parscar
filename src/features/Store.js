import { configureStore } from '@reduxjs/toolkit'
import { detailslice } from './slices/DetailSlice'

export default configureStore({
    reducer: {
        detail: detailslice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})