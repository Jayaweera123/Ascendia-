package com.Ascendia.server.mapper.SiteManager;

import com.Ascendia.server.dto.SiteManager.CommentResponseJobDto;
import com.Ascendia.server.dto.SiteManager.CommentJobDto;
import com.Ascendia.server.entity.SiteManager.CommentJob;



import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CommentJobMapper {

    public static CommentJobDto mapToCommentJobDto(CommentJob commentJob){
        return new CommentJobDto(
                commentJob.getCommentJobId(),
                commentJob.getJob(),
                commentJob.getCommentedJobUser(),
                commentJob.getCommentJobText(),
                commentJob.getCommentJobDate()

        );
    }

    public static CommentJob mapToCommentJob(CommentJobDto commentJobDto){
        return new CommentJob(

                commentJobDto.getCommentJobId(),
                commentJobDto.getJob(),
                commentJobDto.getCommentedJobUser(),
                commentJobDto.getCommentJobText(),
                commentJobDto.getCommentJobDate()


        );
    }


    public static CommentResponseJobDto mapToCommentResponseJobDto(CommentJob savedCommentJob){
        return new CommentResponseJobDto(

                savedCommentJob.getCommentJobId(),
                savedCommentJob.getJob().getJobId(),
                savedCommentJob.getJob().getJobName(),
                savedCommentJob.getCommentedJobUser().getFirstName() + " " +savedCommentJob.getCommentedJobUser().getLastName(),
                savedCommentJob.getCommentedJobUser().getDesignation(),
                savedCommentJob.getCommentedJobUser().getProfilePicUrl(),
                savedCommentJob.getCommentJobText(),
                CommentJobMapper.convertJobDateTime(savedCommentJob.getCommentJobDate())

        );
    }


    public static String convertJobDateTime(LocalDateTime dateTime) {
        // Define the pattern for the desired output
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d, E yyyy hh.mm a");

        // Format the given LocalDateTime with the specified pattern
        return dateTime.format(formatter);
    }



}
