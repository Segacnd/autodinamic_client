import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { GeneralProduct } from '../../../graphql/entities';
import { FETCH_DISCOUNT_PRODUCT_LIST } from '../actions';
import { GetProductListError } from '../sagas/get-product-list.saga';
import { ProductListState } from './product-list.reducer';

export const discountProductListReducer: Reducer<ProductListState> = createReducer<ProductListState>({
    productList: [],
    productsCount: 0,
    isFetching: false,
    error: undefined,
})
    .handleAction(FETCH_DISCOUNT_PRODUCT_LIST.STARTED, (state) => ({
        isFetching: true,
        productList: state.productList,
        productsCount: state.productsCount,
        error: undefined,
    }))
    .handleAction(
        FETCH_DISCOUNT_PRODUCT_LIST.COMPLETED,
        (_, action) => ({
            isFetching: false,
            productList: action.payload.products,
            productsCount: parseInt(action.payload.count),
            error: undefined,
        }),
        (state, action) => ({
            isFetching: false,
            productList: state.productList,
            productsCount: state.productsCount,
            error: action.payload as GetProductListError,
        })
    );
