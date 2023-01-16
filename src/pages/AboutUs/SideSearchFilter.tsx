import {
  ChangeEventHandler,
  FC,
  useState
} from "react";
import {
  ColumnContainer, Container, RowContainer
} from "./SideSearchFilter.elements";

const SideSearchFilter: FC = (event) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchTextChange: ChangeEventHandler = (event) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchText(value);
  };

  const handleClearFilters = () => {
    setSearchText("");
    const selecteds = Array.from(
      document.getElementsByClassName("form-select")
    );

    selecteds.map((element: any) => {
      (element as HTMLInputElement).value = "0";
      return "";
    });
  };

  interface DropdownValuesModel {
    id: string;
    value: string;
  }

  interface DropdownModel {
    id: string;
    title: string;
    values: DropdownValuesModel[];
  }

  const dropdownListModel: DropdownModel[] = [
    {
      id: "1",
      title: "Material",
      values: [
        { id: "1", value: "Bold" },
        { id: "2", value: "Rectified" },
      ],
    },
    {
      id: "2",
      title: "Size",
      values: [
        { id: "3", value: "Bold" },
        { id: "4", value: "Rectified" },
      ],
    },
    {
      id: "3",
      title: "Finish",
      values: [
        { id: "5", value: "Bold" },
        { id: "6", value: "Rectified" },
      ],
    },
    {
      id: "4",
      title: "Color",
      values: [
        { id: "7", value: "Bold" },
        { id: "8", value: "Rectified" },
      ],
    },
    {
      id: "5",
      title: "Edge",
      values: [
        { id: "9", value: "Bold" },
        { id: "10", value: "Rectified" },
      ],
    },
  ];

  return (
    <Container>
      <ColumnContainer>
      </ColumnContainer>
      <RowContainer>
      </RowContainer>
    </Container>
  );
};

export default SideSearchFilter;
