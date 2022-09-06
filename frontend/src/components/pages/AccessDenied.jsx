import StatusBox from '../assets/StatusBox'

function AccessDenied() {
  return (
    <div>
        <StatusBox statusMessage='You must be logged in order to access that page.' isError={true}/>
    </div>
  )
}
export default AccessDenied