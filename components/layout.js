
 
export default function Layout({ children }) {
  return (
    <>
      <div className="text-2xl font-bold">title</div>
      <main>{children}</main>
      <div>footer</div>
    </>
  )
}