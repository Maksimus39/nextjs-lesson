import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {dehydrate, useQuery} from "@tanstack/react-query";
import {LocationType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {QueryClient} from "@tanstack/query-core";
import {Card} from "../../components/Card/Card";


const getLocations = () => {
    return fetch('https://rickandmortyapi.com/api/location', {
        method: 'GET',
    }).then(res => res.json())
}

export const getStaticProps = async () => {
    const qurryClient = new QueryClient();
    await qurryClient.fetchQuery(['locations'], getLocations)

    return {
        props: {
            dehydratedState: dehydrate(qurryClient)
        }
    }
}

const Locations = () => {
    const {data: locations} = useQuery<ResponseType<LocationType>>(['locations'], getLocations)

    if (!locations) return null

    const locationsList = locations.results.map(location => (
        <Card key={location.id} name={location.name}/>
    ))

    return (
        <PageWrapper>
            <Header/>
            {locationsList}
        </PageWrapper>
    )
}

export default Locations;