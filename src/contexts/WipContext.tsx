 import { createContext, useContext, useState, ReactNode } from "react";
 import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
 } from "@/components/ui/alert-dialog";
 
 interface WipContextValue {
   openWip: (message?: string) => void;
 }
 
 const WipContext = createContext<WipContextValue | null>(null);
 
 export function WipProvider({ children }: { children: ReactNode }) {
   const [isOpen, setIsOpen] = useState(false);
   const [message, setMessage] = useState("아직 개발중에 있습니다.");
 
   const openWip = (messageOverride?: string) => {
     setMessage(messageOverride || "아직 개발중에 있습니다.");
     setIsOpen(true);
   };
 
   return (
     <WipContext.Provider value={{ openWip }}>
       {children}
       <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
         <AlertDialogContent className="bg-surface border-app">
           <AlertDialogHeader>
             <AlertDialogTitle className="text-app">안내</AlertDialogTitle>
             <AlertDialogDescription className="text-muted-app">
               {message}
             </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
             <AlertDialogAction className="btn-primary">확인</AlertDialogAction>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialog>
     </WipContext.Provider>
   );
 }
 
 export function useWip() {
   const context = useContext(WipContext);
   if (!context) {
     throw new Error("useWip must be used within a WipProvider");
   }
   return context;
 }