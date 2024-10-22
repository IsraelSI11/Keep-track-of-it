import { clsx, type ClassValue } from "clsx"
import { DataSnapshot } from "firebase/database";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseFirebaseResponse(dataSnapshot: DataSnapshot) {
  if (dataSnapshot.exists()) {
    const costsData = dataSnapshot.val();
    // Verifica si los datos son un objeto (como suele ser en Firebase)
    if (typeof costsData === 'object' && costsData !== null) {
      // Convierte el objeto en un array de costes, agregando el id como parte de cada objeto
      return Object.keys(costsData).map(key => ({
        id: key,
        ...costsData[key]
      }));
    } else {
      // Si por alguna razón es un array o no hay datos, lo retorna directamente.
      return [];
    }
  } else {
    return [];
  }
}
