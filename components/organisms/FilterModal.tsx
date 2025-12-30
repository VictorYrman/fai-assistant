// Atoms Components
import ParagraphAtom from "../atoms/ParagraphAtom"; 

// External Dependencies
import { Modal, Pressable, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Constants
import Colors from "@/constants/colors";
import { CategoryObject, MuscleObject } from "@/constants/types";

// Assets
import GlobalStyles from "@/assets/styles/global/GlobalStyles";
import FilterModalStyles from "@/assets/styles/components/organisms/FilterModal";

type FilterModalProps = {
  fields: CategoryObject[] | MuscleObject[];
  visible: boolean;
  selectedValue: CategoryObject | MuscleObject | null;
  onClose: () => void;
  onSelect: (selectedValue: CategoryObject | MuscleObject | null) => void;
};

export default function FilterModal({
  fields,
  visible,
  selectedValue,
  onClose,
  onSelect,
}: FilterModalProps) {
  const onSelectField = (field: CategoryObject | MuscleObject | null) => {
    onSelect(field);
    onClose();
  };

  const isFieldSelected = (
    field: CategoryObject | MuscleObject | null
  ): boolean => {
    if (!field && !selectedValue) return true;
    if (!field || !selectedValue) return false;
    return field.id === selectedValue.id;
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View
        style={[
          GlobalStyles.section,
          GlobalStyles.sectionVertical,
          FilterModalStyles.filterModal,
        ]}
      >
        <Pressable onPress={onClose} style={FilterModalStyles.filterModalClose}>
          <FontAwesome name={"close"} size={32} color={Colors.textDark} />
        </Pressable>
        <View style={[GlobalStyles.content, GlobalStyles.contentVertical]}>
          <Pressable
            onPress={() => onSelectField(null)}
            style={[
              FilterModalStyles.filterModalField,
              isFieldSelected(null) &&
                FilterModalStyles.filterModalFieldSelected,
            ]}
          >
            <ParagraphAtom
              style={[
                GlobalStyles.fwBold,
                FilterModalStyles.filterModalFieldContent,
                isFieldSelected(null) &&
                  FilterModalStyles.filterModalFieldContentSelected,
              ]}
            >
              Любое
            </ParagraphAtom>
          </Pressable>
          {fields.map((field) => (
            <Pressable
              key={field?.id}
              onPress={() => onSelectField(field)}
              style={[
                FilterModalStyles.filterModalField,
                isFieldSelected(field) &&
                  FilterModalStyles.filterModalFieldSelected,
              ]}
            >
              <ParagraphAtom
                style={[
                  GlobalStyles.fwBold,
                  FilterModalStyles.filterModalFieldContent,
                  isFieldSelected(field) &&
                    FilterModalStyles.filterModalFieldContentSelected,
                ]}
              >
                {field?.title}
              </ParagraphAtom>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
}
