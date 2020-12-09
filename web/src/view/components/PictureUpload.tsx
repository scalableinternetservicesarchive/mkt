import * as React from 'react'
import { blobToDataURL } from '../utils'

export function PictureUpload({ onUpload }: { onUpload: (file: string) => void }) {
  const [file, setFile] = React.useState<string | null>(null)
  const fileHandler = (e: any) => {
    blobToDataURL(e.target.files[0], onUpload)
    // onUpload(e.target.files[0])
    setFile(e.target.files[0])
  }

  return (
    <div style={{ margin: 16 }}>
      Upload a picture:
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 8,
          marginBottom: 8,
          width: 300,
          height: 300,
          backgroundColor: '#eee',
          backgroundImage: file ? `url(${URL.createObjectURL(file)})` : undefined,
          backgroundSize: 'cover',
          textAlign: 'center',
        }}
      />
      <input type="file" onChange={fileHandler} />
    </div>
  )
}
