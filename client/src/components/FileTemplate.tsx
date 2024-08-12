import Image from "next/image"

export const getFileLogo = (fileName: string): string => {
    const extension = fileName.slice(-4);
  
    switch (extension) {
      case '.doc':
      case 'docx':
        return '/assets/images/docs_logo.png';
      case '.pdf':
        return '/assets/images/pdf_logo.png';
      default:
        return '/default_logo.png';
    }
}
const FileTemplate=()=>{
    let file="abc.docx"
    const logoSrc=getFileLogo(file);
    return(
        <div className="flex  flex-col m-4 p-2 w-1/12 h-1/6 shadow-md">
            <Image src={logoSrc} alt="NA" width={80} height={100}/>
            <p className="text-sm font-bold">{file}</p>
        </div>
    )
}
export default FileTemplate