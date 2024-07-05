import Todos from './Todos';

const Home = (props) => {
const {showAlert} = props;
  return (
    <div className='lg:mx-20 mx-8'>
      <Todos showAlert={showAlert} />
    </div>
  )
}

export default Home
