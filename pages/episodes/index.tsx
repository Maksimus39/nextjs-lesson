import {CharacterType, ResponseType} from "assets/api/rick-and-morty-api";
import {PageWrapper} from "components/PageWrapper/PageWrapper";
import {API} from "assets/api/api";
import {Card} from "components/Card/Card";
import {getLayout} from "components/Layout/BaseLayout/BaseLayout";


export const getServerSideProps = async () => {
    const episodes = await API.rickAndMorty.getEpisodes()

    if (!episodes) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            episodes
        }
    }
}

type PropsType = {
    episodes: ResponseType<CharacterType>
}

const Episodes = (props: PropsType) => {
    const {episodes} = props

    const episodesList = episodes.results.map(episode => (
        <Card key={episode.id} name={episode.name}/>
    ))

    return (
        <PageWrapper>
            {/*<Header/>*/}
            {episodesList}
        </PageWrapper>
    )
}
Episodes.getLayout = getLayout;
export default Episodes;