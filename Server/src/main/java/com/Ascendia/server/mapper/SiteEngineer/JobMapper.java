//package com.Ascendia.server.mapper.SiteEngineer;
//
//import com.Ascendia.server.dto.SiteEngineer.JobDto;
//import com.Ascendia.server.entity.SiteEngineer.Job;
//
//public class JobMapper {
//    public static JobDto mapToJobDto(Job job){
//        return new JobDto(
//                job.getJobId(),
//                job.getJobName(),
//                job.getDescription(),
//                job.getStartDate(),
//                job.getEndDate(),
//                job.getStatus()
//        );
//    }
//
//    public static Job mapToJob(JobDto jobDto){
//        return new Job(
//                jobDto.getJobId(),
//                jobDto.getJobName(),
//                jobDto.getDescription(),
//                jobDto.getStartDate(),
//                jobDto.getEndDate(),
//                jobDto.getStatus()
//        );
//    }
//}
