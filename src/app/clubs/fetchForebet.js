export async function FetchForebet(){
  try{
    const response = await fetch(`http://localhost:3000/api/forebet`);
    const data = await response.json();
    return data;
  } catch(error){
      console.log(error)
    }
}

export default FetchForebet;