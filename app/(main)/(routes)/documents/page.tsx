"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating...",
      success: "Note created",
      error: "Failed to create note",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s AndryNotes
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
      <Image src={"/welcome.png"} width={300} height={300} alt="Welcome" />
      <div>
        Illustration by{" "}
        <Link href="https://icons8.com/illustrations/author/627444">
          Julia G
        </Link>{" "}
        from <Link href="https://icons8.com/illustrations">Ouch!</Link>
      </div>
    </div>
  );
};

export default DocumentsPage;
