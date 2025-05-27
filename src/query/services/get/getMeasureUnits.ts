import { ApiEndpoints } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';

export const getAuthToken = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.MEASURE_UNIT],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getMeasureUnit: builder.query<void, void>({
                query: () => ({
                    url: ApiEndpoints.MEASURE_UNIT,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.MEASURE_UNIT,
                    name: EndpointNames.MEASURE_UNIT,
                }),
                providesTags: [Tags.MEASURE_UNIT],
            }),
        }),
    });

export const { useGetMeasureUnitQuery } = getAuthToken;
