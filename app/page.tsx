import Movies from "@/components/Movie";

export default async function Home() {

  const getFilmes = async () => {
  const data = [];

    let response = await fetch("https://api.imdbapi.dev/titles");
    let responseData = await response.json();
    data.push(...responseData.titles);


    for (let i = 0; i < 4; i++) {
      response = await fetch(`https://api.imdbapi.dev/titles?pageToken=${responseData.nextPageToken}`);
      responseData = await response.json();
      data.push(...responseData.titles);

    }

    return data;
    
  }

  const filmes = await getFilmes();


  return (
    <div className="h-screen w-screen flex flex-col items-center p-10">
      <h1 className="text-5xl font-bold">More/Less</h1>
      <Movies filmes={filmes}/>
    </div>
  );
}