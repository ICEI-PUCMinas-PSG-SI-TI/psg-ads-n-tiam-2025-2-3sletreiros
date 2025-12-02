import { useState } from "react";
import { Button } from "@components/Button/Button";
import { Container, ContentBlock } from "src/styles/global";
import { ContentHeader } from "./style";
import { InputField } from "@components/Input/InputField";
import { View } from "react-native";
import { formatDate } from "@utils/formatter";
import DateTimePicker from "@react-native-community/datetimepicker";

export function Sales() {
    const [downloadingPdf, setDownloadingPdf] = useState(false)

    const [initialDate, setInitialDate] = useState(new Date())
    const [openInitialDate, setOpenInitialDate] = useState()
    const [finalDate, setFinalDate] = useState(new Date())
    const [openFinalDate, setOpenFinalDate] = useState()

    const [hasChosenInitial, setHasChosenInitital] = useState(false) 
    const [hasChosenFinal, setHasChosenFinal] = useState(false) 
    
    function cleanFilters() {
        setHasChosenFinal(false)
        setHasChosenInitital(false)
    }

    return (
        <Container>
            <ContentBlock>
                <ContentHeader>
                    <Button 
                        buttonStyle={!downloadingPdf ? 'primary' : 'outline'} 
                        onPress={() => generateSummaryPDF()}
                        icon={'download'}
                        loading={downloadingPdf}
                    />
                    <Button 
                        buttonStyle={'primary'} 
                        onPress={() => openModal()}
                        icon={'addCircle'}
                    />
                </ContentHeader>
            </ContentBlock>

            <ContentBlock>
                <View style={{flexDirection: 'row', gap: 10}}>
                    <Button 
                        onPress={() => setOpenInitialDate(true)} 
                        buttonStyle={!hasChosenInitial ? "surface" : "primary"}
                        icon={"calendar"}
                        iconPosition={"left"}
                    >
                        {!hasChosenInitial ? 'Início' : formatDate(initialDate)}
                    </Button>
                    <Button 
                        onPress={() => setOpenFinalDate(true)} 
                        buttonStyle={!hasChosenFinal ? "surface" : "primary"}
                        icon={"calendar"}
                        iconPosition={"left"}
                    >
                        {!hasChosenFinal ? 'Final' : formatDate(finalDate)}
                    </Button>
                    <Button buttonStyle={"surface"} icon={'eraser'} onPress={cleanFilters}/>
                </View>

                {openInitialDate && (
                    <DateTimePicker
                        value={initialDate}
                        mode="date"
                        display="calendar"
                        onChange={(event, selected) => {
                            setOpenInitialDate(false);
                            if (selected) {
                                setInitialDate(selected)
                                setHasChosenInitital(true)
                            }
                        }}
                    />
                )}

                {openFinalDate && (
                    <DateTimePicker
                        value={finalDate}
                        mode="date"
                        display="calendar"
                        onChange={(event, selected) => {
                            setOpenFinalDate(false);
                            if (selected) {
                                setFinalDate(selected)
                                setHasChosenFinal(true)
                            }
                        }}
                    />
                )}
            </ContentBlock>
        </Container>
    )
}