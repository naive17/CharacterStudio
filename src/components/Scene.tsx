import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Canvas } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import { TemplateModel } from "./Models";
import Selector from "./Selector";
import '../styles/scene.scss'
import { position } from "html2canvas/dist/types/css/property-descriptors/position";
import { sceneService } from "../services";


export default function Scene(props: any) {

  const [showType, setShowType] = useState(false);
  const [randomFlag, setRandomFlag] = useState(-1);
 
  const random = () => {
    if(randomFlag == -1){
      setRandomFlag(0);
    }else{
      setRandomFlag(1-randomFlag)
    }
  }

  const { 
    wrapClass,
    templates,
    scene,
    downloadPopup,
    mintPopup,
    category,
    setCategory,
    avatar,
    setAvatar,
    setTemplate,
    template,
    setTemplateInfo,
    templateInfo,
    model }: any = props;

    const canvasWrap = {
      height: "100vh",
      width: "100vw",
      position: "absolute" as "absolute",
      zIndex: "0",
      top: "0",
      backgroundColor: "#111111"
    }
    const handleDownload = () =>{
     showType ? setShowType(false) : setShowType(true);
    }

    const downLoad = (format : any) => {
      sceneService.download(model, `CC_Model`, format, false);
    }

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      position: "relative" as "relative"
    }}>
      <div
        id="canvas-wrap"
        className={`canvas-wrap ${wrapClass && wrapClass}`}
        style={{ ...canvasWrap,
            background : 'url(./mainBackground.png)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
      >
        <Canvas
          className="canvas"
          id="editor-scene"
        >
          <gridHelper
            args={[50, 25, "#101010", "#101010"]}
            position={[0, 0, 0]}
          />
          <spotLight
            intensity={1}
            position={[0, 3.5, 2]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            castShadow
          />
          <spotLight
            intensity={0.2}
            position={[-5, 2.5, 4]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <spotLight
            intensity={0.2}
            position={[5, 2.5, 4]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <spotLight
            intensity={0.3}
            position={[0, -2, -8]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            castShadow
          />
          <OrbitControls
            minDistance={1}
            maxDistance={3}
            minPolarAngle={0.0}
            maxPolarAngle={Math.PI / 2 - 0.1}
            enablePan={false}
            target={[0, 1, 0]}
          />
          <PerspectiveCamera
          >
            {!downloadPopup && !mintPopup && (
              <TemplateModel scene={scene} />
            )}
          </PerspectiveCamera>
        </Canvas>
      </div>
      <div style={{
        display:"flex",
        top : "37px",
        right : "44px",
        position : "absolute",
        gap :'20px'
      }}>
        {showType && <>
            <div className="modeltype but" onClick={() => downLoad('vrm')} ><span>VRM</span></div>
            <div className="modeltype but" onClick={() => downLoad('fbx')} ><span>FBX</span></div>
            <div className="modeltype but" onClick={() => downLoad('glb')} ><span>GLB</span></div>
          </>
        }
        <div className="download but" onClick={handleDownload}></div>
      </div>
      <div>
        <Selector
          templates={templates}
          category={category}
          scene={scene}
          avatar = {avatar}
          setAvatar={setAvatar}
          setTemplate={setTemplate}
          template={template}
          setTemplateInfo={setTemplateInfo}
          templateInfo={templateInfo}
          randomFlag={randomFlag}
        />
        <Editor random = {random} category={category} setCategory={setCategory} />
      </div>
    </div>
  );
}
