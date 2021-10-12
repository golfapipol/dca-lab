export async function getServerSideProps({query}) {
    return {
        props: {
            codes: query.codes.split(",")
        }
    }
}

export default function Codes(props) {
    console.log("props", props)
    return (<></>)
  }
  