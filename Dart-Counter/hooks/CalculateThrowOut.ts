

export default () =>{

    const GetThrowOutSuggestions = (score: number) => {
        let suggestions: string[] = []
        if(score === 170){
            suggestions.push("T20 T20 Bull")
        }
        else if(score === 167){
            suggestions.push("T20 T19 Bull")
        }
        else if(score === 164){
            suggestions.push("T20 T18 Bull")
        }
        else if(score === 161){
            suggestions.push("T20 T17 Bull")
        }
        else if(score === 160){
            suggestions.push("T20 T20 D20")
        }
        else if(score === 158){
            suggestions.push("T20 T20 D19")
        }
        else if(score === 157){
            suggestions.push("T20 T19 D20")
        }
        else if(score === 156){
            suggestions.push("T20 T20 D18")
        }
        else if(score === 155){
            suggestions.push("T20 T19 D19")
        }
        else if(score === 154){
            suggestions.push("T20 T18 D20")
        }
        else if(score === 153){
            suggestions.push("T20 T19 D18")
        }
        else if(score === 152){
            suggestions.push("T20 T20 D16")
        }
        else if(score === 151){
            suggestions.push("T20 T17 D20")
        }
        else if(score === 150){
            suggestions.push("T20 T18 D18")
        }
        else if(score === 149){
            suggestions.push("T20 T19 D16")
        }
        else if(score === 148){
            suggestions.push("T20 T20 D14")
        }
        else if(score === 147){
            suggestions.push("T20 T17 D18")
        }
        else if(score === 146){
            suggestions.push("T20 T18 D16")
        }
        else if(score === 145){
            suggestions.push("T20 T15 D20")
        }
        else if(score === 144){
            suggestions.push("T20 T20 D12")
        }
        else if(score === 143){
            suggestions.push("T20 T17 D16")
        }
        else if(score === 142){
            suggestions.push("T20 T14 D20")
        }
        else if(score === 141){
            suggestions.push("T20 T19 D12")
        }
        else if(score === 140){
            suggestions.push("T20 T20 D10")
        }
        else if(score === 139){
            suggestions.push("T20 T13 D20")
        }
        else if(score === 138){
            suggestions.push("T20 T18 D12")
        }
        else if(score === 137){
            suggestions.push("T20 T19 D10")
        }
        else if(score === 136){
            suggestions.push("T20 T20 D8")
        }
        else if(score === 135){
            suggestions.push("T20 T17 D12")
        }
        else if(score === 134){
            suggestions.push("T20 T14 D16")
        }
        else if(score === 133){
            suggestions.push("T20 T19 D8")
        }
        else if(score === 132){
            suggestions.push("T20 T16 D12")
        }
        else if(score === 131){
            suggestions.push("T20 T13 D16")
        }
        else if(score === 130){
            suggestions.push("T20 T18 D8")
        }
        else if(score === 129){
            suggestions.push("T19 T16 D12")
        }
        else if(score === 128){
            suggestions.push("T18 T14 D16")
        }
        else if(score === 127){
            suggestions.push("T20 T17 D8")
        }
        else if(score === 126){
            suggestions.push("T19 T19 D6")
        }
        else if(score === 125){
            suggestions.push("T20 T19 D4")
        }
        else if(score === 124){
            suggestions.push("T20 T16 D8")
        }
        else if(score === 123){
            suggestions.push("T19 T16 D9")
        }
        else if(score === 122){
            suggestions.push("T18 T18 D7")
        }
        else if(score === 121){
            suggestions.push("T20 T11 D14")
        }
        else if(score === 120){
            suggestions.push("T20 20 D20")
        }
        else if(score === 119){
            suggestions.push("T19 T10 D16")
        }
        else if(score === 118){
            suggestions.push("T20 18 D20")
        }
        else if(score === 117){
            suggestions.push("T20 17 D20")  
        }
        else if(score === 116){
            suggestions.push("T20 16 D20")
        }
        else if(score === 115){
            suggestions.push("T20 15 D20")
        }
        else if(score === 114){
            suggestions.push("T20 14 D20")
        }
        else if(score === 113){
            suggestions.push("T20 13 D20")
        }
        else if(score === 112){
            suggestions.push("T20 12 D20")
        }
        else if(score === 111){
            suggestions.push("T20 19 D16")
        }
        else if(score === 110){
            suggestions.push("T20 10 D20")
        }
        else if(score === 109){
            suggestions.push("T20 17 D16")
        }
        else if(score === 108){
            suggestions.push("T20 16 D16")
        }
        else if(score === 107){
            suggestions.push("T19 18 D16")
        }
        else if(score === 106){
            suggestions.push("T20 10 D18")
        }
        else if(score === 105){
            suggestions.push("T20 13 D16")
        }
        else if(score === 104){
            suggestions.push("T18 18 D16")
        }
        else if(score === 103){
            suggestions.push("T20 3 D20")
        }
        else if(score === 102){
            suggestions.push("T20 10 D16")
        }
        else if(score === 101){
            suggestions.push("T17 18 D16")
        }
        else if(score === 100){
            suggestions.push("T20 D20")
        }
        else if(score === 99){
            suggestions.push("T19 10 D16")
        }
        else if(score === 98){
            suggestions.push("T20 D19")
        }
        else if(score === 97){
            suggestions.push("T19 D20")
        }
        else if(score === 96){
            suggestions.push("T20 D18")
        }
        else if(score === 95){
            suggestions.push("T19 D19")
        }
        else if(score === 94){
            suggestions.push("T18 D20")
        }
        else if(score === 93){
            suggestions.push("T19 D18")
        }
        else if(score === 92){
            suggestions.push("T20 D16")
        }
        else if(score === 91){
            suggestions.push("T17 D20")
        }
        else if(score === 90){
            suggestions.push("T18 D18")
        }
        else if(score === 89){
            suggestions.push("T19 D16")
        }
        else if(score === 88){
            suggestions.push("T16 D20")
        }
        else if(score === 87){
            suggestions.push("T17 D18")
        }
        else if(score === 86){
            suggestions.push("T18 D16")
        }
        else if(score === 85){
            suggestions.push("T15 D20")
        }
        else if(score === 84){
            suggestions.push("T20 D12")
        }
        else if(score === 83){
            suggestions.push("T17 D16")
        }
        else if(score === 82){
            suggestions.push("T14 D20")
        }
        else if(score === 81){
            suggestions.push("T15 D18")
        }
        else if(score === 80){
            suggestions.push("T16 D16")
        }
        else if(score === 79){
            suggestions.push("T13 D20")
        }
        else if(score === 78){
            suggestions.push("T18 D12")
        }
        else if(score === 77){
            suggestions.push("T15 D16")
        }
        else if(score === 76){
            suggestions.push("T20 D8")
        }
        else if(score === 75){
            suggestions.push("T17 D12")
        }
        else if(score === 74){
            suggestions.push("T14 D16")
        }
        else if(score === 73){
            suggestions.push("T19 D8")
        }
        else if(score === 72){
            suggestions.push("T16 D12")
        }
        else if(score === 71){
            suggestions.push("T13 D16")
        }
        else if(score === 70){
            suggestions.push("T18 D8")
        }
        else if(score === 69){
            suggestions.push("T19 D6")
        }
        else if(score === 68){
            suggestions.push("T20 D4")
        }
        else if(score === 67){
            suggestions.push("T17 D8")
        }
        else if(score === 66){
            suggestions.push("T10 D18")
        }
        else if(score === 65){
            suggestions.push("T19 D4")
        }
        else if(score === 64){
            suggestions.push("T16 D8")
        }
        else if(score === 63){
            suggestions.push("T13 D12")
        }
        else if(score === 62){
            suggestions.push("T10 D16")
        }
        else if(score === 61){
            suggestions.push("T15 D8")
        }
        else if(score === 60){
            suggestions.push("20 D20")
        }
        else if(score === 59){
            suggestions.push("19 D20")
        }
        else if(score === 58){
            suggestions.push("18 D20")
        }
        else if(score === 57){
            suggestions.push("17 D20")
        }
        else if(score === 56){
            suggestions.push("16 D20")
        }
        else if(score === 55){
            suggestions.push("15 D20")
        }
        else if(score === 54){
            suggestions.push("14 D20")
        }
        else if(score === 53){
            suggestions.push("13 D20")
        }
        else if(score === 52){
            suggestions.push("12 D20")
        }
        else if(score === 51){
            suggestions.push("19 D16")
        }
        else if(score === 50){
            suggestions.push("18 D16")
        }
        else if(score === 49){
            suggestions.push("17 D16")
        }
        else if(score === 48){
            suggestions.push("16 D16")
        }
        else if(score === 47){
            suggestions.push("15 D16")
        }
        else if(score === 46){
            suggestions.push("14 D16")
        }
        else if(score === 45){
            suggestions.push("13 D16")
        }
        else if(score === 44){
            suggestions.push("12 D16")
        }
        else if(score === 43){
            suggestions.push("11 D16")
        }
        else if(score === 42){
            suggestions.push("10 D16")
        }
        else if(score === 41){
            suggestions.push("9 D16")
        }
        else if(score === 40){
            suggestions.push("D20")
        }
        else if(score === 39){
            suggestions.push("7 D16")
        }
        else if(score === 38){
            suggestions.push("D19")
        }
        else if(score === 37){
            suggestions.push("5 D16")
        }
        else if(score === 36){
            suggestions.push("D18")
        }
        else if(score === 35){
            suggestions.push("3 D16")
        }
        else if(score === 34){
            suggestions.push("D17")
        }
        else if(score === 33){
            suggestions.push("1 D16")
        }
        else if(score === 32){
            suggestions.push("D16")
        }
        else if(score === 31){
            suggestions.push("15 D8")
        }
        else if(score === 30){
            suggestions.push("D15")
        }
        else if(score === 29){
            suggestions.push("13 D8")
        }
        else if(score === 28){
            suggestions.push("D14")
        }
        else if(score === 27){
            suggestions.push("11 D8")
        }
        else if(score === 26){
            suggestions.push("D13")
        }
        else if(score === 25){
            suggestions.push("9 D8")
        }
        else if(score === 24){
            suggestions.push("D12")
        }
        else if(score === 23){
            suggestions.push("7 D8")
        }
        else if(score === 22){
            suggestions.push("D11")
        }
        else if(score === 21){
            suggestions.push("5 D8")
        }
        else if(score === 20){
            suggestions.push("D10")
        }
        else if(score === 19){
            suggestions.push("3 D8")
        }
        else if(score === 18){
            suggestions.push("D9")
        }
        else if(score === 17){
            suggestions.push("1 D8")
        }
        else if(score === 16){
            suggestions.push("D8")
        }
        else if(score === 15){
            suggestions.push("7 D4")
        }
        else if(score === 14){
            suggestions.push("D7")
        }
        else if(score === 13){
            suggestions.push("5 D4")
        }
        else if(score === 12){
            suggestions.push("D6")
        }
        else if(score === 11){
            suggestions.push("3 D4")
        }
        else if(score === 10){
            suggestions.push("D5")
        }
        else if(score === 9){
            suggestions.push("1 D4")
        }
        else if(score === 8){
            suggestions.push("D4")
        }
        else if(score === 7){
            suggestions.push("3 D2")
        }
        else if(score === 6){
            suggestions.push("D3")
        }
        else if(score === 5){
            suggestions.push("1 D2")
        }
        else if(score === 4){
            suggestions.push("D2")
        }
        else if(score === 3){
            suggestions.push("1 D1")
        }
        else if(score === 2){
            suggestions.push("D1")
        }
        else{
            suggestions.push("")
        }

        // return the first suggestion, spilt space and return all the values
        return suggestions[0].split(" ");

    }

    return {
        GetThrowOutSuggestions
    }
}