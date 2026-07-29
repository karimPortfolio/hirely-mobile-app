import { Control, FieldError, useController } from "react-hook-form";
import { CreateApplicationPayload } from "../../types/applications.types";
import { Field } from "@/components/common/Field";
import { useMemo, useState } from "react";
import { toastBridge } from "@/utils/toastBridge";
import { DocumentPickerAsset, getDocumentAsync } from "expo-document-picker";
import { TouchableOpacity } from "react-native";
import { File, Trash2, Upload } from "lucide-react-native";
import { Text } from "react-native";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useTextTruncate } from "@/hooks/useTextTruncate";
import { VStack } from "@/components/ui/vstack";
import { cn } from "@/lib/utils";

export const ResumeField = <T extends CreateApplicationPayload>({
  control,
  onFileSelect,
  onFileClear,
  disabled = false,
  error,
  className,
}: {
  control: Control<T>;
  onFileSelect: (file: DocumentPickerAsset | null) => void;
  onFileClear?: () => void;
  error: FieldError | undefined;
  disabled?: boolean;
  className?: string;
}) => {
  const { truncate } = useTextTruncate();
  const [selectedFile, setSelectedFile] = useState<DocumentPickerAsset | null>(
    null,
  );
  const { field } = useController({
    control,
    name: "resume",
  });

  const pickFile = async () => {
    try {
      const result = await getDocumentAsync({
        type: [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile(file);
        onFileSelect(file || null);
        field.onChange(file);
      }
    } catch (error) {
      toastBridge.emitError("Failed to pick a document.");
    }
  };
  const clearFile = () => {
    setSelectedFile(null);
    if (onFileClear) onFileClear();
  };

  const fileSize = useMemo(() => {
    if (!selectedFile || !selectedFile.size) return "Unknown size";

    const size = selectedFile.size % 1024;
    return `${Math.round(size)} KB`;
  }, [selectedFile]);

  return (
    <Field
      control={control}
      label="Resume"
      name="resume"
      error={error}
      isRequired
      space="sm"
      onRender={({ field: { onChange, onBlur, value } }) => (
        <Box>
          {!selectedFile && (
            <TouchableOpacity
              className={cn(
                "flex justify-center items-center border border-gray-500 border-dashed rounded-xl p-2",
                error && "border-red-500",
              )}
              onPress={pickFile}
            >
              <Upload size={24} color="gray" />
              <Text className="text-lg font-medium text-black dark:text-white">
                Upload Resume
              </Text>
              <Text className="text-gray-600 dark:text-gray-400">
                PDF or DOCX (max 5MB)
              </Text>
            </TouchableOpacity>
          )}
          {selectedFile && (
            <Box className="flex flex-row items-center justify-between border rounded-lg border-zinc-200 dark:border-zinc-700 p-3">
              <Box className="flex flex-row items-center gap-2">
                <File size={26} color="#2550ad" />
                <VStack>
                  <Text className="text-black dark:text-white font-medium mb-1">
                    {truncate(selectedFile.name, 25)}
                  </Text>
                  <Text className="text-gray-500 dark:text-gray-400 ">
                    {fileSize}
                  </Text>
                </VStack>
              </Box>
              <Button variant="destructive" onPress={clearFile}>
                <Trash2 size={18} color="white" />
              </Button>
            </Box>
          )}
        </Box>
      )}
    />
  );
};
