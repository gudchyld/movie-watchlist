

function Layout({children}) {
  return (
    <>
      <div className="max-w-[550px] w-[70vw] h-[90vh] bg-[#121212] flex flex-col">        
       {children}
      </div>
    </>
  );
}

export default Layout;
