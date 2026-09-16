import { Link } from "react-router"

const Home = () => {
  return (
   <>
   <div className=" mx-auto py-20 mt-10 w-[50%] text-center">
    <h1 className="text-6xl text-accent">KeyStrike</h1>
    <p className="my-3 text-grDark text-xl">Test Your Typing Speed With Minimalist Typing Chart</p>
    <div className="flex flex-col mt-18 ">
      <button className="rounded-lg bg-accent p-5 my-2 cursor-pointer text-dark">Test Typing</button>
      <Link className="rounded-lg bg-accent p-5 cursor-pointer text-dark" to="howitworks">How It Works</Link>
    </div>

   </div>
   </>
  )
}

export default Home
