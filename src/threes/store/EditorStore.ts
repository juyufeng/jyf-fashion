import { create } from 'zustand';
import * as THREE from 'three';

interface EditorState {
  selectedTool: string | null;
  selectedObject: THREE.Object3D | null;
  setSelectedTool: (tool: string | null) => void;
  setSelectedObject: (object: THREE.Object3D | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedTool: null,
  selectedObject: null,
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setSelectedObject: (object) => set({ selectedObject: object }),
}));