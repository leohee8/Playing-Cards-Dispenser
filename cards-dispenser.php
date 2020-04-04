<?
const maxCards=52;
$group=["S","H","D","C"];
$cards=[];
$groupSize=maxCards/count($group);
$person=filter_var(isset($_REQUEST["person"])?$_REQUEST["person"]:1,FILTER_VALIDATE_INT);
$qtyEach=$person>0&&$person<=maxCards?floor(maxCards/$person):maxCards;

function convert($input){
    $output=$input;
    if($input==1){$output='A';}
    if($input==10){$output='X';}
    if($input==11){$output='J';}
    if($input==12){$output='Q';}
    if($input==13){$output='K';}
    return $output;
}

for($g=0;$g<count($group);$g++){
    for($c=1;$c<=$groupSize;$c++){
        array_push($cards,$group[$g].'-'.convert($c));
    }
}
shuffle($cards);
echo json_encode(array_chunk($cards,$qtyEach));
?>