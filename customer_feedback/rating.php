<?php
include_once 'conn.php';

//if(!empty($_POST['name'])){
     $name = $_POST['name'];
     $mobile_no = $_POST['mobile_no'];
     $rating = $_POST['rating'];
     $feedback = $_POST['feedback'];
     $prevRatingQuery = "INSERT INTO `rating`(`name`,`mobile_no`,`rating`,`feedback`) VALUES('$name','$mobile_no','$rating','$feedback')";
     $prevRatingResult = $db->query($prevRatingQuery);
        if($prevRatingResult){
            $ratingRow = array(
                'flag' => 'true'
            );
            echo json_encode($ratingRow);
        }else{
            $ratingRow = array(
                'flag' => 'false'
            );
            echo json_encode($ratingRow);
        }
    // echo json_encode($ratingRow);
   //print_r($name);
//}

/*if(!empty($_POST['points'])){
    $post_id = $_POST['post_id'];
    $rating_default_number = 1;
    $points = $_POST['points'];


    $prevRatingQuery = "SELECT * FROM view_rating WHERE post_id = ".$post_id;
    $prevRatingResult = $db->query($prevRatingQuery);
    if($prevRatingResult->num_rows > 0):
        $prevRatingRow = $prevRatingResult->fetch_assoc();
        $rating_default_number = $prevRatingRow['rating_number'] + $rating_default_number;
        $points = $prevRatingRow['total_points'] + $points;

        $query = "UPDATE view_rating SET rating_number = '".$rating_default_number."', total_points = '".$points."', modified = '".date("Y-m-d H:i:s")."' WHERE post_id = ".$post_id;
        $update = $db->query($query);
    else:

        $query = "INSERT INTO view_rating (post_id,rating_number,total_points,created,modified) VALUES(".$post_id.",'".$rating_default_number."','".$points."','".date("Y-m-d H:i:s")."','".date("Y-m-d H:i:s")."')";
        $insert = $db->query($query);
    endif;
    

    $query2 = "SELECT rating_number, FORMAT((total_points / rating_number),1) as average_rating FROM view_rating WHERE post_id = ".$post_id." AND status = 1";
    
    $result = $db->query($query2);
    $ratingRow = $result->fetch_assoc();
    
    if($ratingRow){
        $ratingRow['status'] = 'ok';
    }else{
        $ratingRow['status'] = 'err';
    }
    

    echo json_encode($ratingRow);

}*/
?>