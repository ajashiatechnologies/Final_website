"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface Product3DViewerProps {
  modelUrl?: string
  productName: string
}

function ProductModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const meshRef = useRef<any>()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return <primitive ref={meshRef} object={scene} scale={2} />
}

function Fallback() {
  return (
    <Html center>
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading 3D model...</p>
      </div>
    </Html>
  )
}

export function Product3DViewer({ modelUrl, productName }: Product3DViewerProps) {
  const controlsRef = useRef<any>()

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  // Use a default 3D model if none provided
  const defaultModelUrl = "/assets/3d/duck.glb"
  const actualModelUrl = modelUrl || defaultModelUrl

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Suspense fallback={<Fallback />}>
          <ProductModel url={actualModelUrl} />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button variant="outline" size="icon" onClick={resetView} className="bg-white/80 backdrop-blur-sm">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-2">
        <p className="text-xs text-gray-600">Drag to rotate • Scroll to zoom • Right-click to pan</p>
      </div>
    </div>
  )
}
