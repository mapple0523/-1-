//컴포넌트 선언
function Car(props) {
    return (
      <>
        <h1>I am a {props.brand} {props.name}</h1>
        <hr/>
      </>
    )
  }

export default Car;