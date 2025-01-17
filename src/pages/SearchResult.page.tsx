import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { SET_FILTER_SECTIONS } from '../components/filter/actions';

import { SearchProductList } from '../components/product-list/components/search-product-list';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
    padding-bottom: 40px;
    min-height: 70vh;
`;

const SearchResult: React.FC = React.memo(function SearchResult() {
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search).get('searchTerms');

    const searchTerms = useMemo(() => {
        if (searchParams) {
            return searchParams.split(' ');
        }
    }, [searchParams]);

    useEffect(() => {
        dispatch(SET_FILTER_SECTIONS(undefined));
    }, [dispatch]);

    if (!searchTerms) {
        return null;
    }

    return (
        <Wrapper>
            <SearchProductList searchTerms={searchTerms} />
        </Wrapper>
    );
});

export default SearchResult;
